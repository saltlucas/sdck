<?php

/* theme-options/font.twig */
class __TwigTemplate_a91319c0dfb246b83d124903c9581b3f14a0318358047403bfc7cad6e9700131 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = $this->env->loadTemplate("theme-options/base_option.twig");

        $this->blocks = array(
            'variable' => array($this, 'block_variable'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "theme-options/base_option.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 2
        $context["__internal_89544d92e704a2d1a86c49e0026cf63d47525601a6cb152d37660c494fef03c2"] = $this->env->loadTemplate("form-elements/select.twig");
        // line 3
        $context["__internal_fe18b1e96d0bfc2fa1294edcdae4e594093b6da142abc2910a203b7fce56d544"] = $this->env->loadTemplate("form-elements/input.twig");
        $this->parent->display($context, array_merge($this->blocks, $blocks));
    }

    // line 4
    public function block_variable($context, array $blocks = array())
    {
        // line 5
        echo "  <div class=\"ai1ec-col-sm-6 ai1ec-col-xs-9\">
    ";
        // line 6
        echo $context["__internal_89544d92e704a2d1a86c49e0026cf63d47525601a6cb152d37660c494fef03c2"]->getselect($this->getAttribute((isset($context["select"]) ? $context["select"] : null), "id"), $this->getAttribute((isset($context["select"]) ? $context["select"] : null), "id"), $this->getAttribute((isset($context["select"]) ? $context["select"] : null), "args"), $this->getAttribute((isset($context["select"]) ? $context["select"] : null), "options"));
        echo "
    ";
        // line 7
        echo $context["__internal_fe18b1e96d0bfc2fa1294edcdae4e594093b6da142abc2910a203b7fce56d544"]->getinput($this->getAttribute((isset($context["input"]) ? $context["input"] : null), "id"), $this->getAttribute((isset($context["input"]) ? $context["input"] : null), "id"), $this->getAttribute((isset($context["input"]) ? $context["input"] : null), "value"), "text", $this->getAttribute((isset($context["input"]) ? $context["input"] : null), "args"));
        echo "
  </div>
";
    }

    public function getTemplateName()
    {
        return "theme-options/font.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  42 => 7,  38 => 6,  35 => 5,  25 => 2,  39 => 5,  58 => 12,  45 => 9,  37 => 7,  33 => 5,  51 => 10,  47 => 12,  43 => 9,  41 => 8,  36 => 6,  32 => 4,  27 => 3,  23 => 2,  20 => 1,  34 => 6,  31 => 4,  28 => 3,);
    }
}
