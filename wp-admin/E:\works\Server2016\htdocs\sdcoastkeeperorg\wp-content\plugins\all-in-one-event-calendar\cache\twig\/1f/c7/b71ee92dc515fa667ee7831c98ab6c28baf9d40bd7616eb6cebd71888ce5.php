<?php

/* select2_multiselect.twig */
class __TwigTemplate_1fc7b71ee92dc515fa667ee7831c98ab6c28baf9d40bd7616eb6cebd71888ce5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<div 
\t";
        // line 2
        if (((isset($context["container_class"]) ? $context["container_class"] : null) != false)) {
            // line 3
            echo "\t\tclass=\"";
            echo twig_escape_filter($this->env, (isset($context["container_class"]) ? $context["container_class"] : null), "html", null, true);
            echo "\"
\t";
        }
        // line 5
        echo "\t>
\t";
        // line 6
        $context["__internal_eb7559ef0a9bada069c7c031da15a0d0d56e97d828e5af7a3174c855fd60b23f"] = $this->env->loadTemplate("form-elements/select.twig");
        // line 7
        echo "\t";
        echo $context["__internal_eb7559ef0a9bada069c7c031da15a0d0d56e97d828e5af7a3174c855fd60b23f"]->getselect((isset($context["id"]) ? $context["id"] : null), (isset($context["name"]) ? $context["name"] : null), (isset($context["select2_args"]) ? $context["select2_args"] : null), (isset($context["options"]) ? $context["options"] : null));
        echo "
</div>";
    }

    public function getTemplateName()
    {
        return "select2_multiselect.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  35 => 7,  33 => 6,  30 => 5,  24 => 3,  22 => 2,  19 => 1,);
    }
}
